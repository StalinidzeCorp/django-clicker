from rest_framework import serializers
from .models import UserData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('id',)


class UserSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('id',
                  'username',
                  'password')
