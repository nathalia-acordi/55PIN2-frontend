package literaconnect.literaconect.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import literaconnect.literaconect.ENUM.Categoria;

@JsonIgnoreProperties(ignoreUnknown = true)
public record VolumeInfo(@JsonAlias("title") String titulo,
						 @JsonAlias("description") String descricao,
						 @JsonAlias("pageCount") int numeroPaginas,
						 @JsonAlias("authors") List<Autores> autores,
						 @JsonAlias("publishedDate") String dataLancamento,
						 @JsonAlias("categories") List<Genero> generos,
						 @JsonAlias("imageLinks") Imagem imagens,
						 @JsonAlias("averageRating") Double estrelas) {

}
