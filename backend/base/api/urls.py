from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),
    path('signup/', views.signupView),
    path('get-user/', views.getUser),
    path('updateuser/', views.updateUser, name='update_user'),
    path('userdetails/', views.getUserDetails, name='user_details'),
    path('deleteuser/', views.deleteUser, name='delete_user'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
