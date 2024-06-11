package literaconnect.literaconect.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonIgnoreProperties(ignoreUnknown = true)
public enum Genero {
	ACAO("Ação", "Ação"), CRIME("Crime", "Crime"), FICCAO_JUVENIL("Ficção Juvenil", "Juvenile Fiction"),
	FICCAO_JOVEM_ADULTO("Ficção Jovem Adulto", "Young Adult Fiction"),
	QUADRINHOS_NOVELAS_GRAFICAS("Quadrinhos e Novelas Gráficas", "Comics & Graphic Novels"),
	FICCAO("Ficção", "Fiction"), NOVELA_GRAFICA("Novela Gráfica", "Graphic Novel"),
	ESTUDO_LINGUAS_ESTRANGEIRAS("Estudo de Línguas Estrangeiras", "Foreign Language Study"), POESIA("Poesia", "Poetry"),
	FICCAO_PORTUGUESA("Ficção Portuguesa", "Portuguese Fiction"),
	HISTORIAS_AVENTURA("Histórias de Aventura", "Adventure Stories"), EDUCACAO("Educação", "Education"),
	CIENCIAS_SOCIAIS("Ciências Sociais", "Social Science"), DRAMA("Drama", "Drama"), HISTORIA("História", "History"),
	TECNOLOGIA_ENGENHARIA("Tecnologia e Engenharia", "Technology & Engineering"),
	PRIMEIROS_MINISTROS("Primeiros Ministros", "Prime Ministers"),
	LINGUAGEM_ARTES_DISCIPLINAS("Linguagem, Artes e Disciplinas", "Language Arts & Disciplines"),
	COMEDIA("Comédia", "Comedy"), FILOSOFIA("Filosofia", "Philosophy"), RELIGIAO("Religião", "Religion"),
	ROMANCE("Romance", "Romance"), SONHOS("Sonhos", "Dreams"), ASSASSINATO("Assassinato", "Murder"),
	NATUREZA("Natureza", "Nature"), FAMILIA_RELACIONAMENTOS("Família & Relacionamentos", "Family & Relationships"),
	COLECOES_LITERARIAS("Coleções Literárias", "Literary Collections"),
	LIVROS_ILUSTRADOS_CRIANCAS("Livros Ilustrados para Crianças", "Picture books for children"),
	POESIA_NATAL("Poesia de Natal", "Christmas poetry");

	private String englishName;
	private String portugueseName;

	Genero(String englishName, String portugueseName) {
		this.englishName = englishName;
		this.portugueseName = portugueseName;
	}

	@JsonValue
	public String getEnglishName() {
		return englishName;
	}

	public String getPortugueseName() {
		return portugueseName;
	}

	@JsonCreator
	public static Genero fromString(String text) {
		for (Genero genero : Genero.values()) {
			if (genero.englishName.equalsIgnoreCase(text) || genero.portugueseName.equalsIgnoreCase(text)) {
				return genero;
			}
		}
		// Se nenhum gênero correspondente for encontrado, retorne um valor padrão ou
		// null
		return null;
	}
}
