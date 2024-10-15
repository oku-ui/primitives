import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      design: 'oku',
    }
  },
  actions: {
    // all these actions will return their return type
    setDesign(design: string) {
      this.design = design
      localStorage.setItem('oku-design', design)
    },
    loadDesign() {
      const design = localStorage.getItem('oku-design')
      if (design)
        this.design = design
    },

  },
})
