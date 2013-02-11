#!/usr/bin/python
# ----------------------------------------------------------------------------
# Plugin to generate better enums for chipmunk
#
# Author: Ricardo Quesada
# Copyright 2013 (C) Zynga, Inc
#
# License: MIT
# ----------------------------------------------------------------------------
'''
Plugin to generate better enums for chipmunk
'''

__docformat__ = 'restructuredtext'


# python modules
#import re

# plugin modules
from generate_jsb import JSBGenerateEnums


#
#
# Plugin to generate better enums for Chipmunk
#
#
class JSBGenerateEnums_CP(JSBGenerateEnums):

    def get_name_for_enum(self, name):
        if name.startswith('CP_'):
            return name[3:]
        return None
