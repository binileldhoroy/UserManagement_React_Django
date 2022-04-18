from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import NoteSerializer,UserSerializer
from base.models import Note
from django.contrib.auth.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def signupView(request):
    serializer = UserSerializer(data=request.data)
    user = request.data['username']
    name = request.data['first_name']
    ps = request.data['password']
    email = request.data['email']
    data = {}
    if serializer.is_valid():
        User.objects.create_user(first_name=name,username=user,email=email,password = ps)
        data['status'] = 'success'
        return Response(data)
    else:
        data = serializer.errors
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUser(request):
    if request.user.is_staff:
        users = User.objects.all()
        usersList = []
        for user in users:
            if user.is_staff == False:
                usersList.append({
                    'id': user.id,
                    'name': user.first_name,
                    'username': user.username,
                    'password': user.password,
                })
        return Response(usersList)
    else:
        return Response({'status': False, 'error': 'You are not authorized to view details of users'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteUser(request):
    if request.user.is_staff:
        User.objects.filter(id=request.data['id']).delete()
        users = User.objects.all()
        usersList = []
        for user in users:
            if user.is_staff == False:
                usersList.append({
                    'id': user.id,
                    'name': user.first_name,
                    'username': user.username,
                    'password': user.password,
                })
        return Response(usersList)
    else:
        return Response({'status': False, 'error': 'You are not authorized to view details of users'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    if request.user.is_staff:
        try:
            user = User.objects.get(username=request.data['username'])
            return Response({'error':'Username already exists'})
        except:
            User.objects.filter(id=request.data['id']).update(first_name=request.data['name'],username=request.data['username'])
            return Response({'message':'user updated','status':'true'})
    else:
        return Response({'error':'You are not authoized'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUserDetails(request):
    if request.user.is_staff:
        user = User.objects.get(id=request.data['id'])
        return Response({'status': True, 'data': {
            'id': user.id,
            'name': user.first_name,
            'username': user.username,
        }})
