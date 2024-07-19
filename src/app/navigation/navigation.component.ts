import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacientesComponent } from '../pacientes/pacientes.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, PacientesComponent, HomeComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}
