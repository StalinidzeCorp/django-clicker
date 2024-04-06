from django.db import models
from django.contrib.auth.models import User


class Core(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coins = models.IntegerField(default=0)
    power = models.IntegerField(default=1)

    def click(self):
        self.coins += self.power
        return self



