import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MyDesign } from './pages/my-design/my-design';
import { AddSong } from './pages/add-song/add-song';


export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        title: 'Mysongwayne'
    },
    {
        path:'mysong',component:MyDesign
    },
      {
        path:'addsong',component:AddSong
    }


];
