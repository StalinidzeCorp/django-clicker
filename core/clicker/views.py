from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Core, Boost
from .serializers import CoreSerializer, BoostSerializer


@api_view(['GET'])
def call_click(request):
    core = Core.objects.get(user=request.user)
    is_levelup = core.click()
    if is_levelup:
        Boost.objects.create(core=core, price=core.lvl*50, power=core.lvl*20)
    core.save()

    return Response({'core': CoreSerializer(core).data, 'is_levelup': is_levelup})


class BoostViewSet(viewsets.ModelViewSet):
    queryset = Boost.objects.all()
    serializer_class = BoostSerializer

    def get_queryset(self):
        core = Core.objects.get(user=self.request.user)
        boosts = Boost.objects.filter(core=core)

        return boosts

    def partial_update(self, request, *args, **kwargs):
        boost = self.queryset.get(pk=kwargs['pk'])

        is_levelup = boost.levelup()
        if not is_levelup:
            return Response({'error': 'Ты бомж!'})

        old_boost_stats, new_boost_stats = is_levelup

        return Response({'old_boost_stats': self.serializer_class(old_boost_stats).data,
                         'new_boost_stats': self.serializer_class(new_boost_stats).data})


