```json
{
  "AppModule": {
    "imports": [
      "ConfigModule",
      "TypeOrmModule",
      "GraphQLModule",
      "DomainsModule",
      "AuthModule",
      "RedisModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {},
    "controllers": [],
    "exports": []
  },
  "ConfigModule": {
    "imports": [
      "ConfigHostModule",
      "ConfigModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "ConfigService": {
        "method": "factory",
        "injections": [
          null
        ]
      }
    },
    "controllers": [],
    "exports": [
      "ConfigHostModule",
      "ConfigService"
    ]
  },
  "ConfigHostModule": {
    "imports": [
      "ConfigModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "CONFIGURATION_TOKEN": {
        "method": "factory",
        "injections": []
      }
    },
    "controllers": [],
    "exports": [
      "CONFIGURATION_TOKEN",
      "Symbol(CONFIG_SERVICE)"
    ]
  },
  "TypeOrmModule": {
    "imports": [
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "SourceRepository": {
        "method": "factory",
        "injections": [
          null
        ]
      }
    },
    "controllers": [],
    "exports": [
      "SourceRepository"
    ]
  },
  "TypeOrmCoreModule": {
    "imports": [
      "ConfigModule",
      "ConfigHostModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "EntityManager": {
        "method": "factory",
        "injections": [
          null
        ]
      },
      "Connection": {
        "method": "factory",
        "injections": []
      },
      "TypeOrmModuleOptions": {
        "method": "value"
      }
    },
    "controllers": [],
    "exports": [
      "EntityManager",
      "Connection"
    ]
  },
  "GraphQLModule": {
    "imports": [
      "GraphQLSchemaBuilderModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "GraphQLFactory": {
        "method": "standard"
      },
      "MetadataScanner": {
        "method": "standard"
      },
      "ResolversExplorerService": {
        "method": "standard"
      },
      "ScalarsExplorerService": {
        "method": "standard"
      },
      "PluginsExplorerService": {
        "method": "standard"
      },
      "GraphQLAstExplorer": {
        "method": "standard"
      },
      "GraphQLTypesLoader": {
        "method": "standard"
      },
      "GraphQLSchemaBuilder": {
        "method": "standard"
      },
      "GraphQLSchemaHost": {
        "method": "standard"
      },
      "GqlModuleOptions": {
        "method": "value"
      }
    },
    "controllers": [],
    "exports": [
      "GraphQLTypesLoader",
      "GraphQLAstExplorer"
    ]
  },
  "GraphQLSchemaBuilderModule": {
    "imports": [
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "EnumDefinitionFactory": {
        "method": "standard"
      },
      "InputTypeDefinitionFactory": {
        "method": "standard"
      },
      "ArgsFactory": {
        "method": "standard"
      },
      "InputTypeFactory": {
        "method": "standard"
      },
      "InterfaceDefinitionFactory": {
        "method": "standard"
      },
      "MutationTypeFactory": {
        "method": "standard"
      },
      "ObjectTypeDefinitionFactory": {
        "method": "standard"
      },
      "OutputTypeFactory": {
        "method": "standard"
      },
      "OrphanedTypesFactory": {
        "method": "standard"
      },
      "QueryTypeFactory": {
        "method": "standard"
      },
      "ResolveTypeFactory": {
        "method": "standard"
      },
      "RootTypeFactory": {
        "method": "standard"
      },
      "SubscriptionTypeFactory": {
        "method": "standard"
      },
      "UnionDefinitionFactory": {
        "method": "standard"
      },
      "AstDefinitionNodeFactory": {
        "method": "standard"
      },
      "GraphQLSchemaFactory": {
        "method": "standard"
      },
      "TypeDefinitionsGenerator": {
        "method": "standard"
      },
      "FileSystemHelper": {
        "method": "standard"
      },
      "TypeDefinitionsStorage": {
        "method": "standard"
      },
      "TypeMapperSevice": {
        "method": "standard"
      },
      "TypeFieldsAccessor": {
        "method": "standard"
      },
      "OrphanedReferenceRegistry": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "GraphQLSchemaFactory",
      "FileSystemHelper"
    ]
  },
  "AuthModule": {
    "imports": [
      "JwtModule",
      "UserModule",
      "ConfigModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "AuthService": {
        "method": "standard"
      }
    },
    "controllers": [
      "AuthController"
    ],
    "exports": [
      "AuthService"
    ]
  },
  "JwtModule": {
    "imports": [
      "ConfigModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "JwtService": {
        "method": "standard"
      },
      "JWT_MODULE_OPTIONS": {
        "method": "factory",
        "injections": [
          null
        ]
      }
    },
    "controllers": [],
    "exports": [
      "JwtService"
    ]
  },
  "UserModule": {
    "imports": [
      "TypeOrmModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "UserService": {
        "method": "standard"
      },
      "AuthUserService": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "TypeOrmModule",
      "UserService"
    ]
  },
  "DomainsModule": {
    "imports": [
      "AuthModule",
      "AuthUserModule",
      "CompanyModule",
      "ContactModule",
      "MediumModule",
      "SourceModule",
      "UserModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "RedisCoreModule"
    ],
    "providers": {},
    "controllers": [],
    "exports": []
  },
  "AuthUserModule": {
    "imports": [
      "UserModule",
      "AuthModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "RedisCoreModule"
    ],
    "providers": {
      "AuthUserService": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "AuthUserService"
    ]
  },
  "CompanyModule": {
    "imports": [
      "ContactModule",
      "TypeOrmModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "CompanyResolver": {
        "method": "standard"
      },
      "CompanyService": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "TypeOrmModule",
      "CompanyService"
    ]
  },
  "ContactModule": {
    "imports": [
      "CompanyModule",
      "TypeOrmModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "ContactHistoryService": {
        "method": "standard"
      },
      "ContactResolver": {
        "method": "standard"
      },
      "ContactHistoryResolver": {
        "method": "standard"
      },
      "ContactService": {
        "method": "standard"
      },
      "ContactStageService": {
        "method": "standard"
      },
      "ContactStatusService": {
        "method": "standard"
      },
      "FileUploadResolver": {
        "method": "standard"
      },
      "MediumService": {
        "method": "standard"
      },
      "SourceService": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "TypeOrmModule",
      "ContactService"
    ]
  },
  "MediumModule": {
    "imports": [
      "TypeOrmModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "MediumService": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "TypeOrmModule",
      "MediumService"
    ]
  },
  "SourceModule": {
    "imports": [
      "TypeOrmModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule",
      "RedisCoreModule"
    ],
    "providers": {
      "SourceService": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "TypeOrmModule",
      "SourceService"
    ]
  },
  "RedisModule": {
    "imports": [
      "RedisCoreModule",
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule"
    ],
    "providers": {},
    "controllers": [],
    "exports": []
  },
  "RedisCoreModule": {
    "imports": [
      "ConfigModule",
      "ConfigHostModule",
      "TypeOrmCoreModule",
      "AuthUserModule"
    ],
    "providers": {
      "RedisService": {
        "method": "standard"
      }
    },
    "controllers": [],
    "exports": [
      "RedisService"
    ]
  }
}
```