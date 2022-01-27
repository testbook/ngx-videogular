## tb-videogular/core

Main module, it creates the `VgApiService` and contains some required components and directives like `VgPlayer` and `VgMedia`.

Import definition:

```typescript
...
import { VgCoreModule } from '@testbook/tb-videogular/core';

@NgModule({
    ...
    imports: [
        ...
        VgCoreModule
    ],
    ...
})
export class AppModule {
}
```
