from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView

from .serializers import UserSerializer, UserSerializerDetail
from rest_framework import generics
from .forms import UserForm
from clicker.models import Core, Boost


# Create your views here.


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerDetail


def index(request):
    user = User.objects.filter(id=request.user.id)
    if len(user) != 0:
        core = Core.objects.get(user=request.user)
        boost = Boost.objects.filter(core=core)
        return render(request, 'index.html', {'core': core, 'boosts': boost})
    else:
        return redirect('login')


class user_login(APIView):
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'login.html', {'invalid': True})

    def get(self, request):
        return render(request, 'login.html', {'invalid': True})


class user_logout(APIView):
    def get(self, request):
        logout(request)
        return redirect('login')


class user_register(APIView):
    def get(self, request):
        form = UserForm()
        return render(request, 'register.html', {'form': form})
    
    def post(self, request):
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            core = Core(user=user)
            core.save()
            login(request, user)
            return redirect('index')

        return render(request, 'register.html', {'form': form})




