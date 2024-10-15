const onRE = /^on[^a-z]/
export const isOn = (key: any) => onRE.test(key)
