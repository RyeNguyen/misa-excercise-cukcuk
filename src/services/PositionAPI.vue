<script>
import axios from "axios";

export default {
  name: "PositionAPI",
  methods: {
    getPositions() {
      axios.get('http://cukcuk.manhnv.net/v1/Positions').then(res => {
        return res.data;
      }).catch(res => {
        console.log(res);
      })
    }
  }
}
</script>