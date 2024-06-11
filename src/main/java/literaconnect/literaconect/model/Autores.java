package literaconnect.literaconect.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Autores {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;
	private String nomeAutor;
	
	public Autores() {
		// TODO Auto-generated constructor stub
	}

	public Autores(String nomeAutor) {
		this.nomeAutor = nomeAutor;
	}

	public Long getId() {
		return id;
	}

	public String getNomeAutor() {
		return nomeAutor;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNomeAutor(String nomeAutor) {
		this.nomeAutor = nomeAutor;
	}
}
