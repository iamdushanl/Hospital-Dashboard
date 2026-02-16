import os
import sys
from pathlib import Path

# Ensure repo root is on sys.path so `src` can be imported
REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from src.utils.config import load_config, get_env


def test_load_config_missing_path_returns_empty_dict():
    missing = "nonexistent_config_for_test_abcdef.yaml"
    assert load_config(missing) == {}


def test_get_env_reads_value():
    os.environ["TEST_ENV_KEY"] = "test-value"
    assert get_env("TEST_ENV_KEY") == "test-value"
    del os.environ["TEST_ENV_KEY"]
