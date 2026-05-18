## Summary

Fixes pydantic/pydantic#13112 by allowing `AliasPath` to start with an integer segment and by validating model fields from top-level Python sequence input when a field uses such an alias.

## Behavior fixed

Before this change, `Field(validation_alias=AliasPath(0))` fails during schema construction because pydantic-core requires the first alias path item to be a string. This prevents models from mapping top-level rows/lists into named fields.

After this change, a model like this validates successfully:

```python
class Row(BaseModel):
    id: int = Field(validation_alias=AliasPath(0))
    name: str = Field(validation_alias=AliasPath(1))
    email: str = Field(validation_alias=AliasPath(2))

Row.model_validate([42, 'alice', 'a@example.com'])
```

## Tests added

- Regression coverage for contiguous root list aliases: `AliasPath(0)`, `AliasPath(1)`, `AliasPath(2)`.
- Regression coverage for sparse root list aliases: `AliasPath(0)` and `AliasPath(7)`.

## Compatibility and regression risk

The change is intentionally narrow:

- Existing string-root alias paths continue to use the same dict/object lookup behavior.
- Root integer aliases are enabled only for models that declare an integer-root validation alias.
- JSON object lookup trees continue to index only string root keys; integer-root sequence support is handled on the Python input path.
- Extra handling for sequence-root input does not treat unmapped list positions as extra object fields.

Risk should be low for existing users because previously invalid `AliasPath(0)` definitions now become valid, while existing string-root alias behavior is preserved.
