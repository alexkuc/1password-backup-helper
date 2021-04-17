# 1Password Backup Helper

Automate export of data from 1Password for the offline backup purposes

## Usage

`yarn backup --token <token> --path <path>`

You can obtain token via `op signin <shorthand> --raw`.

If you do not specify `--path`, it will default to `./backup/`.
