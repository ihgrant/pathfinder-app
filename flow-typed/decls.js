// @flow

declare type Feat = {
    benefit: string,
    description: string,
    id: number,
    name: string,
    prerequisites: string,
    special: string,
    type: string
};

declare type Spell = {
    area: string,
    description: string,
    duration: number,
    name: string,
    saving_throw: string,
    school: string,
    spell_level: string
};
