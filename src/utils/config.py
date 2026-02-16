"""Configuration helper: load YAML config and environment overrides."""
from __future__ import annotations

import os
from typing import Any

import yaml


def load_config(path: str | None = None) -> dict[str, Any]:
    # Path priority: explicit path -> CONFIG_YML env -> ./config.yml -> {}
    p = path or os.environ.get("CONFIG_YML") or "config.yml"
    if not os.path.exists(p):
        return {}
    with open(p, "r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def get_env(key: str, default: Any = None) -> Any:
    return os.environ.get(key, default)


__all__ = ["load_config", "get_env"]
