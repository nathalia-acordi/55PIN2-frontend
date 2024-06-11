package literaconnect.literaconect.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Imagem(@JsonAlias("thumbnail") String urlImagem) {
	
	public String getUrlImagem() {
		return urlImagem;
	}
}
