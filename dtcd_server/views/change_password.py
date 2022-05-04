from rest.views import APIView
from rest.response import Response, status
from rest.permissions import IsAuthenticated


class ChPassView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        pass_info = request.data
        if "old_pass" not in pass_info:
            return Response({"message": "old password not provided"}, status.HTTP_400_BAD_REQUEST)
        if "new_pass" not in pass_info:
            return Response({"message": "new password not provided"}, status.HTTP_400_BAD_REQUEST)
        # empty password
        old_pass = pass_info['old_pass']
        new_pass = pass_info['new_pass']
        if old_pass == new_pass:
            return Response({"message": "passwords are the same"}, status.HTTP_400_BAD_REQUEST)
        if not old_pass:
            return Response({"message": "old password is empty"}, status.HTTP_400_BAD_REQUEST)
        if not new_pass:
            return Response({"message": "new password is empty"}, status.HTTP_400_BAD_REQUEST)
        # provided old password doesn't match
        if not request.user.check_password(old_pass):
            return Response({"message": "provided old password doesn't match"}, status.HTTP_403_FORBIDDEN)
        try:
            request.user.set_password(new_pass)
            request.user.save()
        except Exception as e:  # unique constraint
            return Response(
                {
                    "message": str(e).replace('"', "'").replace('\n', ' '),
                },
                status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {
                "message": "password changed successfully!"
            },
            status.HTTP_200_OK
        )
