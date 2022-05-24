NO_ID = 0
NO_TITLE = 1
NO_WORKSPACE = 2
INVALID_PATH = 3
NO_DIR = 4
NO_OLD_DIR_NAME = 5
NO_NEW_DIR_NAME = 6
SLASHES_IN_DIR_NAME = 7
PATH_WITH_DOTS = 8
EMPTY_DIR_NAME = 9
DIR_WITH_DOTS = 10
NO_DIR_NAME = 11
NEW_PATH_EQ_OLD_PATH = 12
MOVING_DIR_INSIDE_ITSELF = 13
DIR_NAME_RESERVED_FOR_META = 14
NEW_NAME_EQ_OLD_NAME = 15
UPD_NOT_EXISTING_DIR = 16


class WorkspaceManagerException(Exception):
    def __init__(self, problem, *args):
        msg = 'no message'
        if problem == NO_ID:
            msg = 'no id is provided'
        elif problem == NO_TITLE:
            msg = 'no title is provided'
        elif problem == NO_WORKSPACE:
            msg = f'workspace {args[0]} does not exist'
        elif problem == INVALID_PATH:
            msg = f'path to workspace: {args[0]} is not valid'
        elif problem == NO_DIR:
            msg = f'directory {args[0]} does not exist'
        elif problem == NO_OLD_DIR_NAME:
            msg = 'no old dir name is provided'
        elif problem == NO_NEW_DIR_NAME:
            msg = 'no new dir name or new path is provided'
        elif problem == SLASHES_IN_DIR_NAME:
            msg = f'slashes in dir name are not allowed. The name was: {args[0]}'
        elif problem == PATH_WITH_DOTS:
            msg = f"paths with '/../' and '//' are not allowed. The path was: {args[0]}"
        elif problem == EMPTY_DIR_NAME:
            msg = 'Empty dir name provided'
        elif problem == NO_DIR_NAME:
            msg = 'Dir name not provided'
        elif problem == NEW_PATH_EQ_OLD_PATH:
            msg = f'New path and old path are the same. The path was: {args[0]}'
        elif problem == MOVING_DIR_INSIDE_ITSELF:
            msg = f'Trying to move dir inside itself: {args[0]} -> {args[1]}'
        elif problem == DIR_NAME_RESERVED_FOR_META:
            msg = f'This name is reserved for dir info meta file: {args[0]}'
        elif problem == NEW_NAME_EQ_OLD_NAME:
            msg = f'New name and old name are the same. The name was: {args[0]}'
        elif problem == UPD_NOT_EXISTING_DIR:
            msg = f'Trying to update not existing dir {args[0]}'
        super().__init__(msg)
