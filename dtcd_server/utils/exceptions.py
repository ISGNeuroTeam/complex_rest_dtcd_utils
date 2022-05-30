class FragmentDoesNotExist(Exception):
    """Fragment does not exist."""
    pass


class FragmentExists(Exception):
    """Fragment already exists."""
    pass


class FragmentNotEmpty(Exception):
    """Fragment is not empty."""
    pass
