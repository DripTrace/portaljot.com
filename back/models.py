# yes added!!!
# # This is an auto-generated Django model module.
# # You'll have to do the following manually to clean this up:
# #   * Rearrange models' order
# #   * Make sure each model has one field with primary_key=True
# #   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
# #   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# # Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models


# class Account(models.Model):
#     userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.
#     type = models.TextField()
#     provider = models.TextField(primary_key=True)  # The composite primary key (provider, providerAccountId) found, that is not supported. The first column is selected.
#     provideraccountid = models.TextField(db_column='providerAccountId')  # Field name made lowercase.
#     refresh_token = models.TextField(blank=True, null=True)
#     access_token = models.TextField(blank=True, null=True)
#     expires_at = models.IntegerField(blank=True, null=True)
#     token_type = models.TextField(blank=True, null=True)
#     scope = models.TextField(blank=True, null=True)
#     id_token = models.TextField(blank=True, null=True)
#     session_state = models.TextField(blank=True, null=True)
#     createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
#     updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'Account'
#         unique_together = (('provider', 'provideraccountid'),)


# class Authenticator(models.Model):
#     credentialid = models.TextField(db_column='credentialID', unique=True)  # Field name made lowercase.
#     userid = models.OneToOneField('User', models.DO_NOTHING, db_column='userId', primary_key=True)  # Field name made lowercase. The composite primary key (userId, credentialID) found, that is not supported. The first column is selected.
#     provideraccountid = models.TextField(db_column='providerAccountId')  # Field name made lowercase.
#     credentialpublickey = models.TextField(db_column='credentialPublicKey')  # Field name made lowercase.
#     counter = models.IntegerField()
#     credentialdevicetype = models.TextField(db_column='credentialDeviceType')  # Field name made lowercase.
#     credentialbackedup = models.BooleanField(db_column='credentialBackedUp')  # Field name made lowercase.
#     transports = models.TextField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'Authenticator'
#         unique_together = (('userid', 'credentialid'),)


# class Session(models.Model):
#     sessiontoken = models.TextField(db_column='sessionToken', unique=True)  # Field name made lowercase.
#     userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.
#     expires = models.DateTimeField()
#     createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
#     updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'Session'


# class User(models.Model):
#     id = models.TextField(primary_key=True)
#     name = models.TextField(blank=True, null=True)
#     email = models.CharField(unique=True, max_length=100)
#     emailverified = models.DateTimeField(db_column='emailVerified', blank=True, null=True)  # Field name made lowercase.
#     image = models.TextField(blank=True, null=True)
#     password = models.CharField(max_length=128)
#     firstname = models.TextField()
#     lastname = models.TextField()
#     role = models.TextField(blank=True, null=True)
#     stripeid = models.TextField(db_column='stripeId', blank=True, null=True)  # Field name made lowercase.
#     customerid = models.TextField(db_column='customerId', blank=True, null=True)  # Field name made lowercase.
#     username = models.CharField(unique=True, max_length=64)
#     userid = models.CharField(db_column='userId', unique=True, max_length=64)  # Field name made lowercase.
#     active = models.BooleanField()
#     is_staff = models.BooleanField()
#     is_superuser = models.BooleanField()
#     last_login = models.DateTimeField(blank=True, null=True)
#     created_on = models.DateTimeField(blank=True, null=True)
#     updated_at = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'User'


# class Verificationtoken(models.Model):
#     identifier = models.TextField(primary_key=True)  # The composite primary key (identifier, token) found, that is not supported. The first column is selected.
#     token = models.TextField()
#     expires = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'VerificationToken'
#         unique_together = (('identifier', 'token'),)


# class PrismaMigrations(models.Model):
#     id = models.CharField(primary_key=True, max_length=36)
#     checksum = models.CharField(max_length=64)
#     finished_at = models.DateTimeField(blank=True, null=True)
#     migration_name = models.CharField(max_length=255)
#     logs = models.TextField(blank=True, null=True)
#     rolled_back_at = models.DateTimeField(blank=True, null=True)
#     started_at = models.DateTimeField()
#     applied_steps_count = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = '_prisma_migrations'


# class AccountEmailaddress(models.Model):
#     email = models.CharField(max_length=254)
#     verified = models.BooleanField()
#     primary = models.BooleanField()
#     user = models.ForeignKey(User, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'account_emailaddress'
#         unique_together = (('user', 'email'),)


# class AccountEmailconfirmation(models.Model):
#     created = models.DateTimeField()
#     sent = models.DateTimeField(blank=True, null=True)
#     key = models.CharField(unique=True, max_length=64)
#     email_address = models.ForeignKey(AccountEmailaddress, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'account_emailconfirmation'


# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=150)

#     class Meta:
#         managed = False
#         db_table = 'auth_group'


# class AuthGroupPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#     permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group', 'permission'),)


# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
#     codename = models.CharField(max_length=100)

#     class Meta:
#         managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type', 'codename'),)


# class AuthtokenToken(models.Model):
#     key = models.CharField(primary_key=True, max_length=40)
#     created = models.DateTimeField()
#     user = models.OneToOneField(User, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'authtoken_token'


# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.SmallIntegerField()
#     change_message = models.TextField()
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey(User, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'django_admin_log'


# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)

#     class Meta:
#         managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)


# class DjangoMigrations(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'django_migrations'


# class DjangoSession(models.Model):
#     session_key = models.CharField(primary_key=True, max_length=40)
#     session_data = models.TextField()
#     expire_date = models.DateTimeField()

#     class Meta:
#         managed = False
#         db_table = 'django_session'


# class DjangoSite(models.Model):
#     domain = models.CharField(unique=True, max_length=100)
#     name = models.CharField(max_length=50)

#     class Meta:
#         managed = False
#         db_table = 'django_site'


# class PortaljotauthCustomusermodelGroups(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     customusermodel = models.ForeignKey(User, models.DO_NOTHING)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'portaljotauth_customusermodel_groups'
#         unique_together = (('customusermodel', 'group'),)


# class PortaljotauthCustomusermodelUserPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     customusermodel = models.ForeignKey(User, models.DO_NOTHING)
#     permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'portaljotauth_customusermodel_user_permissions'
#         unique_together = (('customusermodel', 'permission'),)


# class SocialaccountSocialaccount(models.Model):
#     provider = models.CharField(max_length=200)
#     uid = models.CharField(max_length=191)
#     last_login = models.DateTimeField()
#     date_joined = models.DateTimeField()
#     extra_data = models.JSONField()
#     user = models.ForeignKey(User, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialaccount'
#         unique_together = (('provider', 'uid'),)


# class SocialaccountSocialapp(models.Model):
#     provider = models.CharField(max_length=30)
#     name = models.CharField(max_length=40)
#     client_id = models.CharField(max_length=191)
#     secret = models.CharField(max_length=191)
#     key = models.CharField(max_length=191)
#     provider_id = models.CharField(max_length=200)
#     settings = models.JSONField()

#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialapp'


# class SocialaccountSocialappSites(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     socialapp = models.ForeignKey(SocialaccountSocialapp, models.DO_NOTHING)
#     site = models.ForeignKey(DjangoSite, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialapp_sites'
#         unique_together = (('socialapp', 'site'),)


# class SocialaccountSocialtoken(models.Model):
#     token = models.TextField()
#     token_secret = models.TextField()
#     expires_at = models.DateTimeField(blank=True, null=True)
#     account = models.ForeignKey(SocialaccountSocialaccount, models.DO_NOTHING)
#     app = models.ForeignKey(SocialaccountSocialapp, models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialtoken'
#         unique_together = (('app', 'account'),)


# class WaitlistsWaitlistentry(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     email = models.CharField(max_length=254)
#     description = models.TextField(blank=True, null=True)
#     updated = models.DateTimeField()
#     timestamp = models.DateTimeField()
#     user = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'waitlists_waitlistentry'
