import { tokenize, compile } from 'stylis'

const testData = `
   & {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  
  @truthy(recursive);
  & * + * {
    margin-top: props(space);
  }
  @else;
  & > * + * {
    margin-top: props(space);
  }
  
  @exist(separateFrom);
  & > :nth-child(props(separateFrom)) {
    margin-bottom: auto;
  }
`

const tokens = tokenize(testData)
console.log('🚀 ~ file: index.ts ~ line 22 ~ tokens', tokens)
