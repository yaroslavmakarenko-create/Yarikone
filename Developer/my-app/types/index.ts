export interface NavItem {
  id: string
  labelKey: string
  href: string
}

export interface Benefit {
  id: string
  titleKey: string
  descriptionKey: string
  icon: string
}

export interface ProcessStep {
  number: string
  titleKey: string
  descriptionKey: string
}

export interface Testimonial {
  id: string
  name: string
  roleKey: string
  textKey: string
  image: string
}

export interface Stat {
  value: string
  labelKey: string
}
