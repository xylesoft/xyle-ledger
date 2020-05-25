![Tests](https://github.com/xylesoft/xyle-ledger/workflows/XyleLedger%20Tests/badge.svg?branch=master)
![Coverage Report](https://github.com/xylesoft/xyle-ledger/workflows/Coverage%20Report/badge.svg)


# xyle-ledger - A basic time series encrypted ledger.
A basic time series ledger, secured by encrypting and signing transactions with a RSA-4096 public and private key pair. The ledger is perfectly editable by the owner of the private key and passphrase. The ledger can be validated for it's integrity by holders of the public key.

## Testing

## Contracts

## Encrpytion

## Errors

## Ledgers

Each ledger consists of two distinct types types of transactions, those being a `Root Transaction` and a `Signed Transaction`. A `Root Transaction` is a `Signed Transaction` but also containing the property `root: true`, this
is to signify a different origin compared to a `SignedTransactions`.

A `Root Transaction` can be either the very first transaction of a ledger or the first transaction of a new segment in the ledger.

### Ledger directory (Filesystem + S3 approach)

A ledger consists of two distinct files, consisting of a ledger header definition JSON file `head.json` and one or more transaction ledgers `<segment>.jsonl`.

A standard filesystem based ledger should consist of the following structure:
```
    my-ledger\
        head.json
        MySegment1.jsonl
        ... more jsonl files ...
```

This ledger structure can also be used with S3 or any document/object store with no modification. Although if you wish to store the data in a different database management system, you must create an abstraction interface for the desired interface. This is very much the responsbility of the implementor of *XyleLedger*, as the project does not concern it self with how or where the ledger is stored.

## Head

The header file (`head.json`) contains all the index information about the respective ledger. It contains the sequence numbers and locations of each segment file.

The structure of the JSON file is:
```typescript
interface SegmentDefinition {
    file: string;
    seq: number;
}

interface Head {
    segments: {
        [segment: string]: SegmentDefinition;
    };
    lastSeqNumber: number;
}
```

An example of the most basic `head.json` using the `dateKeySegmenter()`:
```json
{
    "segments": {
        "2020-05": {
            "file": "2020-05.json",
            "seq": 1
        }
    },
    "lastSeqNumber": 1
}
```

## Segments

Segments exist to create a separation of transactions into managable blocks, allowing for quicker searching and less parsing of data.

In a basic scenario we might want all transactions to be separated by months, firstly we create a theorical key, for a monthly key we could use `YYYY-DD` as a date format. This format should then produce 2020-01, 2020-02, 2020-03 and so on.

With this scenario in mind, you could now configure the ledger to automatically write new transactions to their respective month by querying each transaction's timestamp. If its timestamp is "2020-03-13 23:43:11.234", it will be written to the 2020-03.jsonl transaction file. Creating segments, where each JSONL file will then be a monthly segment of the ledger.

Each new segment file **MUST** start with a root transaction consisting of a seed, which is the signature of previous segment file. This builds a chain of authority using the previous segment as seed to it's validity.

## Branching

This is a theorical possibility, a new segment could be created next to an existing one, creating for 2 branches from a seed segment.

## Service Providers

This is where the argument of a respected provider raises it's head, to be able to provide the authority of the ledger, even though the user owns the keys and passphrase to modify the ledger. The ledger is maintained by the service provider who licences out actions to read and write with the ledger using the authority of the ledger owner to allow encryption of new transactions.

In theory the user can download the entire transaction ledger as JSONL files, allowing then to personally validate or modify the ledger as they wish. But re-uploading a modified ledger is not allowed, as integrity of ledger's authority is broken.

## Transactions

Transactions are broken into three workable parts, of which only 2 are used after signing and encryption.

### Raw Transactions
The raw transaction is considered a transaction minus the signature and seed, these transactions consist of user entered data and the timestamp. Prior to signing a transaction, a seed will need to be populated by copying the previous transaction's signature into the new raw transaction's seed property. This links the new transaction's signature mathmatically to the previous transaction's signature.

### Signed Transactions
Once a raw transaction acquires a seed (signature from a previous transaction) and signature it's then considered signed and part of the ledger.

### Root Transactions
A root transaction encompasses everything a signed transaction does, but two distinct difference exists. Firstly the transaction contains the property `root: true` and also the seed is acquired from a different source.

In the case if a root ledger transaction, then we use an encrypted payload of the raw root transaction. This allows the private key owner to decrypt the seed and double check that the value, timestamp and reference all match equally, validating the root of the ledger.

With segments a root transaction is also employed, the difference is the seed is a signature of the previous segment jsonl file.

## Utils


## License

This project is MIT licensed. See the [linked license](LICENSE.md) for details.