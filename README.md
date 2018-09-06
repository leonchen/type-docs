# type-docs

## install

```
npm install --save-dev type-docs
```

## usage

1. in your typescript code, add the special comments:

  ```
  // @docstart API/Players/List
  export interface PlayerList {
      players: Player[];
      count: number;
  }
  // @docend
  ```

1. in your template markdown file(eg, DOCS.t.md), add the following tempalte code:
  
  ```
  List
  ${API/Player/List}
  ```

1. run `type-docs -d src/ -t src/DOCS.t.md -o DOCS.md`
1. `DOCS.md` will be generated with the type definitions filled