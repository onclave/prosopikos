import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RequestMapperService} from '../request-mapper.service';
import {HomeComponent} from './home/home.component';


const routes: Routes = [{
	path: RequestMapperService.ROOT_URL_RELATIVE,
	component: HomeComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {
}
