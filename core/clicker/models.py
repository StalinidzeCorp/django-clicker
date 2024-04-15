from copy import copy
from django.db import models
from django.contrib.auth.models import User


class Core(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coins = models.IntegerField(default=0)
    power = models.IntegerField(default=1)
    lvl = models.IntegerField(default=0)

    def click(self):
        self.coins += self.power

        if self.coins >= self.check_lvl_price():
            self.lvl += 1
            return True
        return False

    def check_lvl_price(self):
        return (self.lvl ** 2 + 1) * 100 * (self.lvl + 1)


class Boost(models.Model):
    core = models.ForeignKey(Core, on_delete=models.CASCADE)
    lvl = models.IntegerField(default=1)
    price = models.IntegerField(default=10)
    power = models.IntegerField(default=1)

    def levelup(self):
        if self.price > self.core.coins:
            return False

        old_boost_stats = copy(self)

        self.core.coins -= self.price
        self.core.power += self.power
        self.core.save()

        self.lvl += 1
        self.power *= 2
        self.price *= 10
        self.save()

        return old_boost_stats, self

