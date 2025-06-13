from django.urls import path
from .views import UserSignIn,UserSignUp,UserProfile

urlpatterns =[
    path('signin/', UserSignIn.as_view(), name='user_sign_in'),
    path('signup/', UserSignUp.as_view(), name='user_sign_up'),
    path('profile/',UserProfile.as_view(), name='user_profile'),
]