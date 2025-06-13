from django.db import models

class User (models.Model):

    
    name = models.CharField(
        'Name', max_length=200, null=False, blank=False,
     )
    
    password = models.CharField(
        'Password',max_length=255, null=False, blank=False
      )
    
    email = models.CharField(
        'Email', max_length=255, null=False, blank=False
    )

    token = models.CharField(
        'Token', blank=True, null=True, max_length=500, db_index=True
    )

    token_expires = models.DateTimeField(
        'Token Expiration Date', blank=True, null=True
    )

    created_at = models.DateTimeField(
        'Creation Date', blank=True, auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Update Date', blank=True, auto_now=True 
    )

    def __str__(self):
        return self.email
    


