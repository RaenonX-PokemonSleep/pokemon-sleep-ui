type UiMessages = typeof import('./src/translations/ui-en.json');
type GameMessages = typeof import('./src/translations/ui-en.json');

type I18nMetadata = {
  Title: string,
};

type PageWithIndividual = {
  Index: I18nMetadata,
  Page: I18nMetadata,
};

type GameObjectIdToString = {[id in string]: string};

declare interface IntlMessages extends UiMessages, GameMessages {
  Locale: string,
  UI: {
    Subscription: {
      AdBlockActive: string,
      Popup: string,
      PremiumOnly: string,
      Activation: {
        AdsFree: string,
        Premium: string,
      },
    },
    Auth: {
      EmailSent: string,
    },
    Common: {
      Candy: string,
      Day: string,
      Default: string,
      DreamShards: string,
      Hour: string,
      Map: string,
      MainSkill: string,
      MaxCarry: string,
      MealCoverage: string,
      Pokebox: string,
      Rank: string,
      ResearchExp: string,
      Rewards: string,
      Shiny: string,
      SnorlaxFavorite: string,
      SnorlaxRank: string,
      Stamina: string,
      Strength: string,
    },
    Evolution: {
      SleepTime: string,
    },
    MainSkill: {
      EffectType: {
        Strength: string,
        Shards: string,
        Stamina: string,
        Help: string,
        Cooking: string,
        Random: string,
      },
      Target: {
        Self: string,
        Random: string,
        Team: string,
      },
    },
    Metadata: {
      Site: {
        Name: string,
        Description: string,
      },
      NotFound: I18nMetadata,
      Home: I18nMetadata,
      Pokedex: PageWithIndividual,
      SleepStyle: {
        Index: I18nMetadata,
        Sleepdex: {
          Index: I18nMetadata,
          Record: I18nMetadata,
          Lookup: I18nMetadata,
        },
        Map: PageWithIndividual,
        UniqueMap: PageWithIndividual,
        Special: I18nMetadata,
      },
      Analysis: I18nMetadata,
      Rating: I18nMetadata,
      Cooking: {
        Index: I18nMetadata,
        Make: I18nMetadata,
        Prepare: I18nMetadata,
      },
      Meal: PageWithIndividual,
      Ingredient: PageWithIndividual,
      Berry: PageWithIndividual,
      Team: {
        Analysis: I18nMetadata,
        Box: I18nMetadata,
        Index: I18nMetadata,
        Maker: I18nMetadata,
        SkillTriggerAnalysis: I18nMetadata,
      },
      Info: {
        Index: I18nMetadata,
        Pot: I18nMetadata,
        Nature: I18nMetadata,
        MainSkill: PageWithIndividual,
        SubSkill: I18nMetadata,
        ProducingParams: I18nMetadata,
      },
      Item: {
        Index: I18nMetadata,
        Evolution: I18nMetadata,
        Incense: PageWithIndividual,
      },
      PokemonExp: I18nMetadata,
      Stamina: I18nMetadata,
      About: I18nMetadata,
      Docs: {
        Index: I18nMetadata,
        New: I18nMetadata,
        Edit: I18nMetadata,
        View: I18nMetadata,
      },
    },
    InPage: {
      Home: {
        Welcome: string,
      },
      Pokedex: {
        Info: {
          Berry: string,
          Evolution: string,
          Ingredient: string,
          MainSkill: string,
          Name: string,
          PokemonLevel: string,
          PokemonType: string,
          Production: string,
          SleepType: string,
          Specialty: string,
          Stats: string,
        },
        Stats: {
          Energy: {
            Daily: string,
            Name: string,
            Weekly: string,
          },
          FrequencyBase: string,
          FrequencyEquivalent: string,
          Friendship: string,
          Recruit: string,
          TransferReward: string,
          TimeToFullPack: string,
          MainSkillValue: string,
          MainSkillTriggerValue: string,
          MainSkillTriggerRate: string,
          EventOnly: string,
        },
        Sort: {
          Id: string,
          DateRegistered: string,
          IngredientEnergy: string,
          IngredientCount: string,
          IngredientRate: string,
          BerryEnergy: string,
          BerryCount: string,
          MainSkillLevel: string,
          FrequencyOfBerry: string,
          FrequencyOfIngredient: string,
          FriendshipPoint: string,
          SkillCount: string,
          SkillStrength: string,
          TotalEnergy: string,
        },
        Input: {
          EvolutionCount: string,
          FinalEvolution: string,
        },
      },
      Analysis: {
        FirstAppearance: string,
        LastSleepStyle: string,
      },
      Rating: {
        FriendshipLevel: string,
        AdvancedOptions: string,
        Message: {
          RatingBasisIsIngredientRelated: string,
        },
      },
      Cooking: {
        Energy: string,
        Ingredient: {
          Name: string,
          Filler: string,
          Missing: string,
          Required: string,
        },
        MealType: string,
        PotCapacity: string,
        Preparer: {
          IncludeFiller: string,
        },
        RecipeLevel: string,
        ToggleUnmakeable: string,
        Total: string,
        TargetMealCount: string,
      },
      Map: {
        Unique: string,
        Pokemon: string,
        SleepStyle: string,
        SleepStylesUnlocked: string,
        UnlockConditions: string,
        Toggle: {
          SleepdexRegisterMode: string,
          CompletionStatus: string,
          Registered: string,
          NoNewSleepStyle: string,
        },
      },
      Team: {
        Analysis: {
          Period: string,
        },
        CurrentEnergy: string,
        SubSkill: string,
        NatureEffect: string,
        Box: {
          DisplayType: {
            Frequency: string,
            Info: string,
            Pokemon: string,
            MaxCarry: string,
            ProductionBerry: string,
            ProductionIngredient: string,
            ProductionTotal: string,
            Rating: string,
            Skills: string,
          },
          Preview: {
            Level: string,
            FinalEvolution: string,
          },
        },
        Maker: {
          Basis: string,
          Behavior: {
            ToggleInsufficientIngredients: string,
          },
          CompCountWarning: string,
          Control: {
            ExportToTeamAnalysis: string,
            ExportTeamName: string,
          },
          Source: {
            Pokebox: string,
            Vanilla: string,
          },
          State: {
            IngredientRequirements: {
              Pass: string,
              Fail: string,
            },
            Status: {
              Standby: string,
              Initializing: string,
              GeneratingTeams: string,
              Calculating: string,
              Completed: string,
              Error: string,
              Canceled: string,
            },
          },
        },
      },
      Info: {
        Pot: {
          Capacity: string,
          Expand: string,
          UnlockedRecipes: string,
        },
      },
      PokemonExp: {
        ExpToNext: string,
        OwnedCandies: string,
        NormalCandy: string,
        HandyCandy: string,
        Multiplier: {
          DreamShardDepletion: string,
          ExpBoost: string,
        },
        KeyLevel: string,
      },
      Docs: {
        Title: string,
      },
      ProducingParams: {
        Notice: string,
      },
    },
    Ocr: {
      Status: {
        Error: string,
        Ready: string,
        Thresholding: string,
        LoadingOcr: string,
        Recognizing: string,
        Completed: string,
      },
      Tolerance: {
        Title: string,
        Tips: string,
      },
    },
    Producing: {
      State: {
        Awake: string,
        AsleepUnfilled: string,
        AsleepFilled: string,
      },
      Preset: {
        UnfilledOnly: string,
      },
      Total: string,
      Probability: {
        NoSkillAfterWakeup: string,
      },
      ProduceType: {
        Berry: string,
        Ingredient: string,
        MainSkill: string,
      },
    },
    Rating: {
      WeightedStatsBasis: {
        Percentile: string,
        Percentage: string,
        RelativeStrength: string,
      },
    },
    SleepStyle: {
      DrowsyPowerRequirement: string,
      DrowsyPowerMultiplier: string,
      IncenseOnly: string,
      Unreleased: string,
      Message: {
        UnlockRankDiffers: string,
        ChooseMapFirst: string,
      },
    },
    Stamina: {
      Title: string,
      SleepSession: string,
      Chart: {
        Stamina: string,
        Efficiency: string,
      },
      Strategy: {
        Optimistic: string,
        Conservative: string,
      },
      SkillRecovery: {
        Amount: string,
        DailyCount: string,
      },
      EventType: {
        SkillRecovery: string,
        EfficiencyBlock: string,
        Sleep: string,
        Wakeup: string,
      },
      State: {
        Asleep: string,
        Average: string,
        Awake: string,
      },
    },
    UserSettings: {
      AlwaysFullPack: string,
      BerryPokemonFullPack: string,
      GoodCampTicket: string,
      IncludeMainSkill: string,
      Cooking: {
        Title: string,
      },
      Message: {
        SettingsNotStored: string,
      },
    },
    UserControl: {
      Login: string,
      Logout: string,
    },
  },
  Game: {
    Berry: GameObjectIdToString,
    Field: GameObjectIdToString,
    Food: GameObjectIdToString,
    Item: GameObjectIdToString,
    MainSkill: {
      Name: GameObjectIdToString,
      Description: GameObjectIdToString,
    },
    MealType: GameObjectIdToString,
    Nature: GameObjectIdToString,
    NatureEffect: GameObjectIdToString,
    PokemonType: GameObjectIdToString,
    PokemonName: GameObjectIdToString,
    RankTitle: GameObjectIdToString,
    SleepFace: {
      onSnorlax: {Default: string},
      [pokemonId: string]: GameObjectIdToString
    },
    SleepType: GameObjectIdToString,
    Specialty: GameObjectIdToString,
    SubSkill: {
      Name: GameObjectIdToString,
      Description: GameObjectIdToString,
    },
  }
}
