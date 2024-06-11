package literaconnect.literaconect.model;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Livros {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;
	@Column(unique = true)
	private String titulo;
	@Column(length = 10000)
	private String descricao;
	private String imagem;
	private String dataPublicacao;
	@Enumerated(EnumType.STRING)
	private Genero genero;
	@Column(nullable = true)
	private Double numeroEstrelas;
	
	public Livros() {
	}
	
	public Livros(Long id, String titulo, String imagem, String dataPublicacao, Genero genero, String descricao, double estrelas) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.imagem = imagem;
		this.dataPublicacao = dataPublicacao;
		this.genero = genero;
		this.descricao = descricao;
		this.numeroEstrelas = estrelas;
	}
	
	public String getImagem() {
		return imagem;
	}
	
	public Double getNumeroEstrelas() {
		return numeroEstrelas;
	}
	
	public void setNumeroEstrelas(Double numeroEstrelas) {
		this.numeroEstrelas = numeroEstrelas;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getIsbn() {
		return imagem;
	}
	public void setImagem(String imagem) {
		this.imagem = imagem;
	}
	public String getDataPublicacao() {
		return dataPublicacao;
	}
	public void setDataPublicacao(String dataPublicacao) {
		this.dataPublicacao = dataPublicacao;
	}
	public Genero getGenero() {
		return genero;
	}
	
	public void setGenero(Genero genero) {
		this.genero = genero;
	}
	
	public String getDescricao() {
		return descricao;
	}
	
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
}
