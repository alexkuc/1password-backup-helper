# 1Password Backup Helper

Automate export of data from 1Password for the offline backup purposes

## Usage

`yarn backup --token <token> --path <path> --uuid`

You can obtain token via `op signin <shorthand> --raw`.

If you do not specify `--path`, it will default to `./backup/`.

Optionally, you may use `--uuid` to use uuid instead of actual titles. This is useful when you want to automate creation of incremental backups. Without this switch, when a duplicate occurs, a `-<number> is added to the file name. Unfortunately, the order of items is not guaranteed (API limitation of 1Password) so diff may report artificial differences (due to order of files).
