"""Generate a synthetic patients CSV for testing the ETL/deid pipeline."""
from __future__ import annotations

import argparse
import csv
import os
import random
from datetime import datetime, timedelta


FIRST = ["Alex", "Sam", "Jamie", "Taylor", "Jordan", "Casey", "Morgan", "Riley", "Cameron", "Drew"]
LAST = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Lopez", "Wilson"]
DIAG = ["I10", "E11", "J18", "N18", "M54", "K21", "F32", "G47", "R07", "Z00"]


def random_date(start: datetime, end: datetime) -> datetime:
    delta = end - start
    return start + timedelta(days=random.randint(0, delta.days))


def generate_row(i: int) -> dict:
    first = random.choice(FIRST)
    last = random.choice(LAST)
    name = f"{first} {last}"
    ssn = f"{random.randint(100,999)}-{random.randint(10,99)}-{random.randint(1000,9999)}"
    dob = random_date(datetime(1930, 1, 1), datetime(2005, 12, 31)).date()
    admission = random_date(datetime(2019, 1, 1), datetime(2025, 1, 1)).date()
    discharge = admission + timedelta(days=random.randint(1, 14))
    diagnosis = random.choice(DIAG)
    lab = round(random.gauss(100, 30), 1)
    gender = random.choice(["M", "F"])
    age = max(0, admission.year - dob.year)
    readmit = 1 if random.random() < 0.12 else 0
    return {
        "patient_id": f"P{i:06d}",
        "patient_name": name,
        "ssn": ssn,
        "dob": dob.isoformat(),
        "admission_date": admission.isoformat(),
        "discharge_date": discharge.isoformat(),
        "diagnosis_code": diagnosis,
        "age": age,
        "gender": gender,
        "lab_value": lab,
        "outcome_readmit": readmit,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True, help="Output CSV path")
    parser.add_argument("--n", type=int, default=200, help="Number of rows to generate")
    args = parser.parse_args()

    out_dir = os.path.dirname(args.out)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    fieldnames = [
        "patient_id",
        "patient_name",
        "ssn",
        "dob",
        "admission_date",
        "discharge_date",
        "diagnosis_code",
        "age",
        "gender",
        "lab_value",
        "outcome_readmit",
    ]

    with open(args.out, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, args.n + 1):
            writer.writerow(generate_row(i))

    print(f"Wrote synthetic CSV: {args.out} ({args.n} rows)")


if __name__ == "__main__":
    main()
