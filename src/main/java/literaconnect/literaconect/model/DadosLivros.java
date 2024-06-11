package literaconnect.literaconect.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DadosLivros(@JsonAlias("items") List<Item> itens) {
	
	public List<Item> getItens() {
		return itens;
	}
}
