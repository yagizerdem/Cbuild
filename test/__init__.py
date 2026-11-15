import os
import sys

# The packages under test live under src/; make them importable for unittest discovery.
_src_root = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src")
if _src_root not in sys.path:
    sys.path.insert(0, _src_root)
