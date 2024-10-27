from django.core.mail.backends.smtp import EmailBackend

#SSL verification is process of checking validity of SSL certificate 
#SSL (secure sockets layer) is security protocol that establishes encrypted link 
#between web server and browser, ensuring data transferred between them remains 
#private and secure.
class CustomEmailBackend(EmailBackend):
    def _get_ssl_context(self):
        import ssl
        context = super()._get_ssl_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        return context
    