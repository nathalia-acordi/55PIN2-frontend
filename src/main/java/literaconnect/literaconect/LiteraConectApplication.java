package literaconnect.literaconect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import literaconnect.literaconect.repository.LivrosRepository;
import literaconnect.literaconect.service.AdicionarLivrosBiblioteca;

@SpringBootApplication
public class LiteraConectApplication implements CommandLineRunner {
	@Autowired
	private LivrosRepository repositorio;
	
	public static void main(String[] args) {
		SpringApplication.run(LiteraConectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		AdicionarLivrosBiblioteca adicionar = new AdicionarLivrosBiblioteca(repositorio);
		adicionar.adicionarLivrosBiblioteca();
	}

}
