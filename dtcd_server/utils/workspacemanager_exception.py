NO_ID = 0
NO_TITLE = 1
NO_WORKSPACE = 2


class WorkspaceManagerException(Exception):
    def __init__(self, problem, *args):
        msg = 'no message'
        if problem == NO_ID:
            msg = 'no id is provided'
        elif problem == NO_TITLE:
            msg = 'no title is provided'
        elif problem == NO_WORKSPACE:
            msg = f'workspace {args[0]} does not exist'
        super().__init__(msg)