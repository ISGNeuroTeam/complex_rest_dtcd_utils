"""
Custom exceptions.
"""


class FragmentDoesNotBelongToGraph(Exception):
    """Fragment does not belong to given graph."""
    pass


class FragmentDoesNotExist(Exception):
    """Fragment does not exist."""
    pass


class FragmentIsNotBound(Exception):
    """Fragment is unbound."""
    pass
