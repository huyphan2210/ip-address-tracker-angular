import { NgModule } from "@angular/core";

import { Main } from "./main/main.component";
import { Footer } from "./footer/footer.component";


@NgModule({
    declarations: [
        Main,
        Footer
    ],
    exports: [
        Main,
        Footer
    ]
})

export class ComponentsModule {};