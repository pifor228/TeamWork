from django.db import models
 
class Movie(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(default='', blank=True)
    genre = models.CharField(max_length=50)
    duration = models.IntegerField()
    age_rating = models.CharField(max_length=10)
    year = models.IntegerField()
    
    def __str__(self):
        return self.title