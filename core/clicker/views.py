from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Core
from .serializers import CoreSerializer


@api_view(['GET'])
def call_click(request):
    core = Core.objects.get(user=request.user)
    core.click()
    core.save()

    return Response({'core': CoreSerializer(core).data})
