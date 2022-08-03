import shell from 'shelljs'
const { ShellString } = shell

export const dump = (variable: string) => (path: string) => {
  new ShellString(variable).to(path)
}
