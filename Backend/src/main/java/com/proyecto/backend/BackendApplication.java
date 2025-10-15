package com.proyecto.backend;

import com.proyecto.backend.model.Category;
import com.proyecto.backend.model.Feature;
import com.proyecto.backend.repository.CategoryRepository;
import com.proyecto.backend.repository.FeatureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.proyecto.backend.service.HotelService;
import com.proyecto.backend.model.Hotel;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initCategories(CategoryRepository categoryRepository) {
        return args -> {
            if (categoryRepository.count() == 0) {
                categoryRepository.save(new Category("Hotel", "Hoteles y alojamientos"));
                categoryRepository.save(new Category("Cabaña", "Cabañas en zonas turísticas"));
                categoryRepository.save(new Category("Departamento", "Departamentos temporarios"));
            }
        };
    }

    @Bean
    CommandLineRunner initData(FeatureRepository featureRepository) {
        return args -> {
            if (featureRepository.count() == 0) {
                Feature wifi = new Feature();
                wifi.setName("WiFi");
                wifi.setIcon("fa-wifi");

                Feature aire = new Feature();
                aire.setName("Aire acondicionado");
                aire.setIcon("fa-snowflake");

                Feature estacionamiento = new Feature();
                estacionamiento.setName("Estacionamiento");
                estacionamiento.setIcon("fa-car");

                Feature cocina = new Feature();
                cocina.setName("Cocina");
                cocina.setIcon("fa-kitchen-set");

                Feature televisor = new Feature();
                televisor.setName("Televisor");
                televisor.setIcon("fa-tv");

                Feature mascotas = new Feature();
                mascotas.setName("Apto mascotas");
                mascotas.setIcon("fa-paw");

                featureRepository.save(wifi);
                featureRepository.save(aire);
                featureRepository.save(estacionamiento);
                featureRepository.save(cocina);
                featureRepository.save(televisor);
                featureRepository.save(mascotas);

                System.out.println("✅ Características iniciales cargadas correctamente");
            } else {
                System.out.println("ℹ️ Las características ya estaban cargadas, no se agregaron duplicados");
            }
        };
    }



    // CommandLineRunner para inicializar hoteles automáticamente
    @Bean
    public CommandLineRunner initDatabase(HotelService hotelService) {
        return args -> {
            hotelService.saveHotel(new Hotel(

                    "Hotel Sol",
                    "Mar del Plata",
                    1500.0,
                    4,
                    List.of(
                            "https://images.pexels.com/photos/751266/pexels-photo-751266.jpeg?_gl=1*mu9653*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2Mjk3NzQkajMzJGwwJGgw",
                            "https://images.pexels.com/photos/9330675/pexels-photo-9330675.jpeg?_gl=1*2ngdqc*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzA1MTEkajI2JGwwJGgw",
                            "https://images.pexels.com/photos/33741938/pexels-photo-33741938.jpeg?_gl=1*1xlzu7x*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzA1ODckajYwJGwwJGgw",
                            "https://images.pexels.com/photos/12387865/pexels-photo-12387865.jpeg?_gl=1*17gnuk4*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzAxMzAkajU5JGwwJGgw",
                            "https://images.pexels.com/photos/11042879/pexels-photo-11042879.jpeg?_gl=1*1hjr15v*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzAyMjckajIyJGwwJGgw"
                    )

            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Luna",
                    "Bariloche",
                    1800.0,
                    5,
                    List.of(
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                            "https://images.pexels.com/photos/18651507/pexels-photo-18651507.jpeg?_gl=1*7nfjqg*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzE2MzkkajEwJGwwJGgw",
                            "https://images.pexels.com/photos/18651506/pexels-photo-18651506.jpeg?_gl=1*wyoqs*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzE3NjQkajYwJGwwJGgw",
                            "https://images.pexels.com/photos/7031732/pexels-photo-7031732.jpeg?_gl=1*y67rw9*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzE4ODkkajU5JGwwJGgw",
                            "https://images.pexels.com/photos/7546286/pexels-photo-7546286.jpeg?_gl=1*11ut742*_ga*MzAzMzg5NTUwLjE3NTc2Mjk2ODE.*_ga_8JE65Q40S6*czE3NTc2Mjk2ODEkbzEkZzEkdDE3NTc2MzIwNjgkajU5JGwwJGgw"
                    )));

            hotelService.saveHotel(new Hotel(

                    "Hotel Río",
                    "Mendoza",
                    1200.0,
                    3,
                    List.of(
                            "https://images.unsplash.com/photo-1715228233376-93744d6ca507?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1724659215886-3674d0a05845?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1724701624580-5d6b4d599b8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1724818358769-7d2e5a82674d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQzfHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1724659215927-49ad6e812a04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"

                    )
            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Nube",
                    "Córdoba",
                    2000.0,
                    5,
                    List.of(
                            "https://plus.unsplash.com/premium_photo-1686090450479-370d5ddf4de1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1686090449194-04ac2af9f758?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w0fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1686090448728-34d6ebc43390?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w3fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1686090448451-fe1327f9b042?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w5fHx8ZW58MHx8fHx8"

                    )
            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Lago",
                    "Ushuaia",
                    2200.0,
                    4,
                    List.of(
                            "https://images.unsplash.com/photo-1674216645434-b235ae260b57?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://media.istockphoto.com/id/1286627626/es/foto/hyatt-sanur-bali.webp?a=1&s=612x612&w=0&k=20&c=PdaeqPrGjz1IN5cmGQQVO4UPhHdtX5bTknDN9r9_ffA=",
                            "https://images.unsplash.com/photo-1616045152565-5f210e42c22a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
                            "https://plus.unsplash.com/premium_photo-1670984939096-f3cfd48c7408?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
                            "https://images.unsplash.com/photo-1668260592478-a6513b0a690e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg3fHxob3RlbCUyMGV4dGVyaW9yJTIwJTJCJTIwaG90ZWwlMjBpbnRlcmlvciUyMCUyQiUyMGNhYmluJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D"

                    )
            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Arena",
                    "Pinamar",
                    1600.0,
                    3,
                    List.of(
                            "https://plus.unsplash.com/premium_photo-1681922761134-1f2bde2ec525?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
                            "https://plus.unsplash.com/premium_photo-1682285210821-5d1b5a406b97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
                            "https://plus.unsplash.com/premium_photo-1724659217647-4bfdba75e5a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
                            "https://plus.unsplash.com/premium_photo-1664121799972-98e5aa03d31b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1724818359743-bcbf84e189e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wzfHx8ZW58MHx8fHx8"


                    )
            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Nevado",
                    "San Martín de los Andes",
                    2100.0,
                    4,
                    List.of(
                            "https://plus.unsplash.com/premium_photo-1755612126261-9157dfccf4da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1736194029008-6e8bfd6f7a74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1736194028582-cffca7640320?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1666539896295-53361253ab3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
                            "https://plus.unsplash.com/premium_photo-1736194027924-61f9085c8c3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"

                    )
            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Cataratas",
                    "Puerto Iguazú",
                    2300.0,
                    5,
                    List.of(
                            "https://plus.unsplash.com/premium_photo-1687995671537-4075c0eec665?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1687995673055-83105bc1625a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w2fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1687995672195-0676a1e1d4f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w0fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1687995673113-865539d3b21d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wzfHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1687996108443-cf7be83dc234?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

                    )
            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Montaña",
                    "Tafí del Valle",
                    1400.0,
                    3,
                    List.of(
                            "https://plus.unsplash.com/premium_photo-1736194029386-f78f8baeed39?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1736194027578-c70e20d1e8f3?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w0fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1736194027669-e3d7de84fa8e?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w1fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1736194029494-3649d714814f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
                            "https://plus.unsplash.com/premium_photo-1733514692194-1cc39ee41141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"

                    )
            ));

            hotelService.saveHotel(new Hotel(

                    "Hotel Bosque",
                    "Villa La Angostura",
                    1950.0,
                    4,
                    List.of(
                            "https://plus.unsplash.com/premium_photo-1684508457335-7e36863bf4a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1684506397791-ae0f73b01d9b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            "https://plus.unsplash.com/premium_photo-1684508319486-48151a958a99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w0fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1684506396899-ad9963e6a7bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w1fHx8ZW58MHx8fHx8",
                            "https://plus.unsplash.com/premium_photo-1684506393537-55663d5d9618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w4fHx8ZW58MHx8fHx8"

                    )
            ));
        };
    }

}
