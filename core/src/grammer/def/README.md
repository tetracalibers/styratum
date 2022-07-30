- [SyrmSource](#syrmsource)
- [RegionBlock](#regionblock)
  - [Cascade](#cascade)
  - [Collection](#collection)
- [NamespaceBlock](#namespaceblock)
  - [Cascade](#cascade-1)
  - [Collection](#collection-1)
- [ConditionStatement](#conditionstatement)
  - [ConditionKeyword](#conditionkeyword)
    - [Pre-ConditionKeyword](#pre-conditionkeyword)
    - [Mid-ConditionKeyword](#mid-conditionkeyword)
    - [Post-ConditionKeyword](#post-conditionkeyword)
- [RuleSet](#ruleset)
- [SelectorList](#selectorlist)
- [Selector](#selector)
- [DeclarationBlock](#declarationblock)
- [Declaration](#declaration)
- [Property](#property)
- [Value](#value)

# SyrmSource

.syrm ファイル全文のこと。

```
// BEGIN [SyrmSource]
<Cascade>

</Cascade>

<Collection>

</Collection>
// END [SyrmSource]
```

# RegionBlock

## Cascade

```
// BEGIN [RegionBlock.Cascade]
<Cascade>

</Cascade>
// END [RegionBlock.Cascade]
```

## Collection

```
// BEGIN [RegionBlock.Collection]
<Collection>

</Collection>
// END [RegionBlock.Collection]
```

# NamespaceBlock

## Cascade

```
<Cascade>
  // BEGIN [NamespaceBlock.Cascade]

  // END [NamespaceBlock.Cascade]
</Cascade>
```

## Collection

```
<Collection>
  // BEGIN [NamespaceBlock.Collection]
  <A>
    // BEGIN [NamespaceBlock.Collection.A]

    // END [NamespaceBlock.Collection.A]
  </A>

  <B>
    // BEGIN [NamespaceBlock.Collection.B]

    // END [NamespaceBlock.Collection.B]
  </B>
  // END [NamespaceBlock.Collection]
</Collection>
```

# ConditionStatement

```
<Any>
  // BEGIN [ConditionStatement]
    @Pre-ConditionKeyword
    // BEGIN [RuleSet]
      SelectorList DeclarationBlock
    // END [RuleSet]
    @Mid-ConditionKeyword
    // BEGIN [RuleSet]
      SelectorList DeclarationBlock
    // END [RuleSet]
    // BEGIN [RuleSet]
      SelectorList DeclarationBlock
    // END [RuleSet]
    @Post-ConditionKeyword
  // END [ConditionStatement]
</Any>
```

## ConditionKeyword

### Pre-ConditionKeyword

### Mid-ConditionKeyword

### Post-ConditionKeyword

# RuleSet

# SelectorList

# Selector

# DeclarationBlock

# Declaration

# Property

# Value
