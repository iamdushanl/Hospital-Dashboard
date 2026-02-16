Notebooks

- `00_deid_checks.ipynb` — de-identification validation and quick PHI checks (create once sample data is available)
- `01_eda.ipynb` — exploratory data analysis and cohort discovery

Place sample datasets in `data/sample/` and run `python src/etl/extract.py` to produce `data/sample.parquet`.
