export interface HeroContact {
    /**
     * The email of the hero.
     *
     * @format email
     */
    email: string;

    /**
     * energy status of the hero
     */
    energy: 'positive' | 'negative';
  
    /**
     * Does the hero has super power?
     *
     * @default true
     */
    hasSuperPower?: boolean;
  
    /**
     * The age of the hero
     *
     * @minimum 0
     * @maximum 500
     */
    age: number;
  }
  