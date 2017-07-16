// @flow

declare type Feat = {
    benefit: string,
    description: string,
    id: number,
    name: string,
    prerequisites: string,
    prerequisite_feats: string,
    special: string,
    type: string
};

declare type Spell = {
    area: string,
    description: string,
    duration: number,
    name: string,
    pk: number,
    saving_throw: string,
    school: string,
    spell_level: string
};
